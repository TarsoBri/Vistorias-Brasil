export interface ConfigAxios {
  url: string;
  method: string;
  headers: {
    "Token-Auth": string;
    "Login-Auth"?: string;
  };
}
