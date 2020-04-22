/**
 * @Author Irfan Nasim
 * @since 14-Apr-2020
 * @Description Application Constants
 */
export class APIURLConstants {

    // Authentication API URL
    public static LOGIN_API = '/auth/user/signIn';
    public static LOGOUT_API = '/auth/user/logout';
    public static LOGGED_IN_USER = '/auth/user/loggedInUser?credentials=';

    //User API URL

    //Document Library API URL
    public static GET_ALL_DOCUMENTS_OWNER_ID = '/document/all-by-owner?ownerId=';

}
