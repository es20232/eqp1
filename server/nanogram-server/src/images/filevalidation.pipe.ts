import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import { fromBuffer } from "file-type"

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  async transform(value: Express.Multer.File) {
    if(!value){
      return value;
    }
    const { mime } = await fromBuffer(value.buffer)
    const MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"]

    if (!MIME_TYPES.includes(mime)) {
      throw new BadRequestException(
        "The image should be either jpeg, png, or jpg."
      )
    }

    return value
  }
}