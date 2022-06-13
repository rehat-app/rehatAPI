# rehatAPI
The backend App  

# Deploy Rehat API to Google Cloud Run

## Prerequisite
* GCP Account with project and billing enabled.

## Steps

### Via Cloud Build
Do this if you want to make a CI/CD pipeline.

1. Fork this repository to your own repository.
2. Go to your GCP console, and then go to API & Services. Search for Cloud Run API and Cloud Build API and enable them.
3. Go to Cloud Build and enable the API, then in your left pane, go to settings and enable Cloud Run.
3. Still in Cloud Build and select Triggers in the left pane. Create new trigger.
4. Set up your own configuration and connect to the forked repository earlier. Make sure to choose Cloud Build configuration in Configuration Type. Then create.
5. In the Triggers list, click Run on the trigger that you've just created.
