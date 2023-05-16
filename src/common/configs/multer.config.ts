import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = uuidv4();
      const extension = file.originalname.split('.').pop();
      const filename = `${uniqueSuffix}.${extension}`;
      callback(null, filename);
    },
  }),
};
