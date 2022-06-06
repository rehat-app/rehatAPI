from tensorflow import keras
import cv2
import numpy as np
from flask import Flask, request, jsonify

#Load Model
model = keras.models.load_model("my_model.h5")
model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

app = Flask(__name__)

@app.route("/", methods= ['POST'])
def coba():
    if request.method == "POST":

        #load image dari post request
        image = request.files.get('file')

        if image is None or image.filename == "":
            return jsonify({"error": "no file/image"})

        try:
            # Mulai prediksi
            img = cv2.imread('''file path''')
            img = cv2.resize(img,(150,150))
            img = np.reshape(img,[1,150,150,3])
            cla = model.predict(img)
            classes = np.argmax(cla)

            return jsonify({"hasil" :classes})
        except Exception as e:
            return jsonify({"error" : str(e)})

    return "OK"

if __name__ == "__main__":
    app.run(debug=True)
