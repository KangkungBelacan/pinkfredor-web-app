## v1.0.1
- `/api/auth/login` endpoint now accepts more user information
- Add: `/api/driveapi/user_info` for getting google drive user basic information
- Add: `/api/driveapi/deauth` for unlinking user's google drive
- JWT payload now contains user basic information
- Update: `/api/driveapi/files/download` now attempt to query fileid directly through google drive api instead of relying on existing index
- Update: `/api/driveapi/files/scan` now returns 404 if google drive credentials is not found

## v1.0.0
Initial Release