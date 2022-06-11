const db = require('../models');
const { uploadImage } = require('../helpers/helpers');
const User = db.user;
const sequelize = db.sequelize;
const { QueryTypes } = require('sequelize');
const Analysis = db.analysis;
const axios = require('axios');
const { Op } = db.Sequelize;

const pdfService = require('../helpers/buildPdf');

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

// This is optional
exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

// todo: PROFILE
// GET Data Profile
exports.dataProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    if (!user) {
      return res
        .status(404)
        .send({ message: 'User not found!', rescode: '404' });
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image || 'default image',
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Check Token
exports.checkToken = (req, res) => {
  res.status(200).send({ rescode: 200, message: 'Token Valid' });
};

// Edit Profile
exports.editProfile = async (req, res) => {
  try {
    const id = req.body.userId;
    const name = req.body.username;
    const file = req.file;

    // todo: If user upload new image
    if (file !== undefined) {
      // Upload images on GCS and return the API
      const imageUrl = await uploadImage(req.file);

      if (imageUrl.status === 'error') {
        return res
          .status(401)
          .send({ message: imageUrl.message, rescode: '401' });
      }

      const updated = await User.update(
        {
          username: name,
          image: imageUrl,
        },
        {
          where: { id: id },
        }
      );

      console.log('File uploaded = ', updated);
      return res
        .status(200)
        .send({ message: 'Akunmu harhasil diupdate', rescode: '200' });
    }

    // todo: If the image still same
    await User.update(
      {
        username: name,
      },
      {
        where: { id: id },
      }
    );

    return res
      .status(200)
      .send({ message: 'Akunmu harhasil diupdate', rescode: '200' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// todo: ANALYSIS
// Upload captured photo to GCS
exports.uploadToGCS = async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.file);

    return res
      .status(200)
      .send({ message: 'Upload success', urlImage: imageUrl, rescode: '200' });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Post Analysis
exports.postAnalysis = async (req, res) => {
  try {
    const eyelids = req.body.hangingEyelids;
    const eyebag = req.body.eyesBag;
    const calculationResult = req.body.calculation;
    const imgUrl = req.body.urlImage;

    await Analysis.create({
      user_id: req.userId,
      hanging_eyelids: eyelids,
      eyes_bag: eyebag,
      calculation: calculationResult,
      face_img: imgUrl,
    });

    return res
      .status(200)
      .send({ message: 'Hasil analysis berhasil disimpan', rescode: '200' });
  } catch (e) {
    return res.status(500).send({ message: error.message });
  }
};
// Get [allAnalysis] In week by [userId]
exports.getAnalysisInWeek = async (req, res) => {
  try {
    const allAnalysis = await sequelize.query(
      `SELECT id, face_img as urlImage, calculation, DATE_FORMAT(DATE(createdAt), "%W") as day, DATE_FORMAT(DATE(createdAt), '%d %M %Y') as date, DATE_FORMAT(createdAt,'%k:%i') as time FROM coba WHERE DATE(createdAt) >= DATE(NOW()) - INTERVAL 7 DAY AND DATE(createdAt) <= DATE(NOW()) AND id_user = ${req.userId};`,
      { type: QueryTypes.SELECT }
    );

    return res.status(200).send({
      message: 'Get data analysis successfully',
      data: allAnalysis,
      // calculation:
      rescode: '200',
    });
  } catch (e) {
    return res.status(500).send({ message: error.message });
  }
};
// Get Analysis by [idAnalysis]
exports.getAnalysisById = async (req, res) => {
  try {
    const id = req.params.id;

    const analysis = await Analysis.findOne({
      where: {
        id: id,
      },
    });

    if (!Analysis) {
      return res
        .status(404)
        .send({ message: 'Data analysis not found!', rescode: '404' });
    }

    return res.status(200).send({
      message: 'Get data analysis successfully',
      data: analysis,
      rescode: '200',
    });
  } catch (e) {
    return res.status(500).send({ message: error.message });
  }
};

// todo: Upload to PDF
exports.uploadToPDF = async (req, res) => {
  const requiredData = {
    // stil hardcode
    username: 'Hakim',
    day: 'Kamis',
    data: '12 May 2022',
    time: '14:12',
  };

  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename=report-Rehat-${requiredData.username}.pdf`,
  });

  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end(),
    requiredData
  );
};

// todo: Get ML Model Prediction
exports.getPrediction = async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.file); // return gcs url

    const path = 'https://rehat-351413.et.r.appspot.com/predict';
    let predictResponse = await axios.post(path, {
      url: imageUrl,
    });
    predictResponse = predictResponse.data;

    // Eyebag Condition
    let eyebagCondition = '';
    switch (predictResponse.index_eyebag) {
      case 0:
        eyebagCondition = 'Big eyebag';
        break;
      case 1:
        eyebagCondition = 'No eyebag';
        break;
      case 2:
        eyebagCondition = 'Normal eyebag';
        break;

      default:
        eyebagCondition = 'Unpredicted';
        break;
    }

    // Eyelid Condition
    let eyelidCondition = '';
    if (predictResponse.index_eyelid) eyelidCondition = 'normal';
    else eyelidCondition = 'tired eyelid';

    // Final Calculation
    let finalCondition = {
      probability:
        (predictResponse.prob_eyebag + predictResponse.prob_eyelid) / 2,
    };
    switch (predictResponse.index_eyelid + predictResponse.index_eyebag) {
      case 0:
        finalCondition.header = '';
        finalCondition.detail = '';
        break;
      case 1:
        finalCondition.header = 'Tambah lagi jam tidurmu';
        finalCondition.detail =
          'Tidur 8 jam di hari libur mungkin menjadi solusi';
        break;
      case 2:
        finalCondition.header = '';
        finalCondition.detail = '';
        break;
      case 3:
        finalCondition.header = '';
        finalCondition.detail = '';
        break;
      default:
        finalCondition.header = 'Unvalid';
        finalCondition.detail = 'Unvalid';
        break;
    }

    const prediction = {
      image: imageUrl,
      ...predictResponse,
      eyebagCondition,
      eyelidCondition,
      finalCondition,
    };

    return res.status(200).send({
      message: 'Prediction success',
      prediction: prediction,
      // calculation:
      rescode: '200',
    });
  } catch (e) {
    return res.status(500).send({ message: error.message });
  }
};

// exports.experiments = (req, res) => {
//   let file = req.file;

//   // If new file not uploaded
//   if (file !== undefined) {
//     // Upload images on GCS and return the API
//   }

//   console.log('file = ' + JSON.stringify(file));
//   console.log('name = ' + req.name);
// };
