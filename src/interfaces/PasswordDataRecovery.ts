export interface PasswordDataRecovery {
  newPassword: string;
  update_at: string;
  password?: string | undefined;
  code?: string;
  hashedCode?: string;
}
