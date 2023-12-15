import { CreateDto } from "./create.dto";
import {PartialType} from "@nestjs/mapped-types"

export class UpdateDto extends PartialType(CreateDto){}