// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    http_protocol: 'http',
    http_separator: '/',
    api_end_point_url: 'localhost',
    api_end_point_port: '8080',
    api_context_path: 'drive',
    api_access_client: 'WBDrive',
    api_access_secret: 'WBDrive'
};
