# Animal shelter recommendation system

## Tech Stack
- Spring Boot
- React
- Drools

## Description
This project is a comprehensive system designed to assist animal shelters in managing operations more efficiently. Shelter workers can input data, receive notifications, warnings, and recommendations for optimizing shelter management, and generate detailed reports. The system includes a pet recommendation module, simplifying the process of finding the right pet for potential adopters through a 15-question survey, with tailored recommendations provided at the end. The project was developed as part of a graduation thesis, which is included in the documentation.

## How to run

### Backend
1. Navigate to the **backend** folder and open *ServiceApplication.java* located at **service/src/main/java/com/ftn/sbnz/service**.
2. If using *VS Code*, right-click on the file and select **Run Java**.
3. If using *IntelliJ*, click the green arrow next to the *ServiceApplication* class declaration or use the same arrow in the *Title Bar*.

### Frontend
1. Navigate to the **frontend** folder. In the terminal, run the command *npm install* and wait for the dependencies to install.
2. Run the command *npm run dev*. The application will start, and the frontend will be available at a given address (typically http://localhost:5173).
   - The main landing page is a questionnaire for users to receive pet recommendations.
   - The shelter worker application is accessible at **"/shelter"**.
