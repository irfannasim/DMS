/**
 * @Author Irfan Nasim
 * @since 14-Apr-2020
 * @Description Application URL Constants
 */
export class APIURLConstants {

    // Authentication API URL
    public static LOGIN_API_URL = '/auth/user/signIn';
    public static LOGOUT_API_URL = '/auth/user/logout';
    public static LOGGED_IN_USER_URL = '/auth/user/loggedInUser?credentials=';

    //User API URL

    //Document Library API URL
    public static GET_ALL_DOCUMENTS_OWNER_ID_API_URL = '/document/all-by-owner?ownerId=';
    public static ARCHIVE_DOCUMENT_API_URL = '/document/archive';
    public static RESTORE_DOCUMENT_API_URL = '/document/restore';
    public static DELETE_DOCUMENT_API_URL = '/document/delete';

    public static FETCH_ALL_TRASH_DOCUMENT_API_URL = '/document/archive/all?ownerId=';
    public static DOWNLOAD_DOCUMENT_API_URL = '/document/download?docId=';
    public static FAVOURITE_DOCUMENT_API_URL = '/document/favourite';
    public static FETCH_ALL_FAVOURITE_DOCUMENT_API_URL = '/document/favourite/all?ownerId=';

}
