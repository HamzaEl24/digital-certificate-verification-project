export class CreateCertificatesDto {
  individuals: {
    name: string;
    email: string;
    cause: string;  
  }[];
}
