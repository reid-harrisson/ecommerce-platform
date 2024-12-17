# <div style="display: flex; align-items: center; color: #2d3c7a;"> <img src="web/public/logo.svg" style="width: 80px;" alt="Logo"/> commerce <b style="color: white; padding: 8px">platform</b> </div>

## How to Run the Application

### Backend

1. Navigate to the `api` folder.
2. Ensure `python` and `pipenv` are installed.
3. Duplicate `.env.example` and rename it to `.env`.
4. Update the database configurations in the `.env` file.
5. Execute the following commands:

   ```bash
   $ pipenv shell
   $ pipenv update
   $ python manage.py runserver
   ```

6. The backend server will be accessible at <http://127.0.0.1:8000>

### Frontend

1. Navigate to the `web` folder.
2. Ensure `node.js` is installed.
3. Duplicate `.env.example` and rename it to `.env`.
4. Update the backend API URL in the `.env` file.
5. Execute the following commands:

   ```bash
   $ npm install
   $ npm run dev
   ```

6. The frontend application will be accessible at <http://localhost:3000>
