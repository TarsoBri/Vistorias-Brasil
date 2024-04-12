export interface PasswordDataRecovery {
  _id: string | undefined;
  password: string | undefined;
  newPassword: string;
  code: string;
  hashedCode: string;
}
