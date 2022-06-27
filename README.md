# Welcome to Saunter!

The application contains a list of hiking routes that you can create, add to favorites and delete, and also contains a keyword search.


# Expand project

### 1. Clone repo
### 1. Run npm i
### 4. Add .env file to project root
### 5. Set environment variables
> .env variables are described in the file **.env-example**

1. Get access to Google Maps API
- Get API key
- Create Billing Account
- Create project
- Enable next APIs:
-- [Maps JavaScript API](https://console.cloud.google.com/google/maps-apis/apis/maps-backend.googleapis.com/metrics?project=saunter-353514)
-- [Geocoding API](https://console.cloud.google.com/google/maps-apis/apis/geocoding-backend.googleapis.com/metrics?project=saunter-353514)
 -- [Directions API](https://console.cloud.google.com/google/maps-apis/apis/directions-backend.googleapis.com/metrics?project=saunter-353514)
 -- [Distance Matrix API](https://console.cloud.google.com/google/maps-apis/apis/distance-matrix-backend.googleapis.com/metrics?project=saunter-353514)
 -- [Places API](https://console.cloud.google.com/google/maps-apis/apis/places-backend.googleapis.com/metrics?project=saunter-353514)
 - Select APIs abowe in  **API restrictions** for your key 
- Connect billing account to project
- Add API key in .env 
2. Create project in Firebase
- Build Firestore Database
- In Project Settings get all from firebaseConfig and add this in .env 

# Now you can run the project
