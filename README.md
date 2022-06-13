# rehatAPI
The backend App

## Our Cloud Configuration

We use Cloud Run to deploy our app backend API. We make our backend using Node.js and containerized our app using Docker. To deploy our app we use Cloud Build with cloudbuild.yaml configuration file. For our database server we use Cloud SQL, we also use Cloud Storage to store our data.
![image](https://user-images.githubusercontent.com/99376866/173269810-929d1b2c-52df-4cb4-9ba9-edac5e6262a8.png)

## Deploy Rehat API to Google Cloud Run

### Prerequisite
* GCP Account with project and billing enabled.

### Steps

#### Via Cloud Build
Do this if you want to make a CI/CD pipeline.

1. Fork this repository to your own repository.
2. Go to your GCP console, and then go to API & Services. Search for Cloud Run API and Cloud Build API and enable them.
3. Go to Cloud Build and enable the API, then in your left pane, go to settings and enable Cloud Run.
3. Still in Cloud Build and select Triggers in the left pane. Create new trigger.
4. Set up your own configuration and connect to the forked repository earlier. Make sure to choose Cloud Build configuration in Configuration Type. Then create.
5. In the Triggers list, click Run on the trigger that you've just created.
