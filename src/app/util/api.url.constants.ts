/**
 * @Author Irfan Nasim
 * @since 14-Apr-2020
 * @Description Application Constants
 */
export class APIURLConstants {

    // Authentication API URL
    public static LOGIN_API_URL = '/auth/user/signIn';
    public static LOGOUT_API_URL = '/auth/user/logout';
    public static LOGGED_IN_USER_URL = '/auth/user/loggedInUser?credentials=';

    //User API URL

    //Document Library API URL
    public static GET_ALL_DOCUMENTS_OWNER_ID_API_URL = '/document/all-by-owner?ownerId=';
    public static DELETE_DOCUMENT_API_URL = '/document/delete?docId=';

}
