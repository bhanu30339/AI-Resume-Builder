import { IsEmail, IsNotEmpty, IsOptional, IsString,IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ExperienceDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}


export class EducationDto {
  @IsNotEmpty()
  @IsString()
  degree: string;

  @IsNotEmpty()
  @IsString()
  stream: string;

  @IsNotEmpty()
  @IsString()
  institution: string;

  @IsNotEmpty()
  @IsString()
  university: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsString()
  percentage: string;
}

export class ProjectDto {
  @IsNotEmpty()
  client: string;

  @IsNotEmpty()
  projectName: string;

  @IsNotEmpty()
  environment: string;

  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  role: string;

  @IsArray()
  @IsString({ each: true })
  responsibilities: string[];
}

// Union type for project field
type ProjectsField = string | ProjectDto[];
export class CreateResumeDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experiences: ExperienceDto[];

  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];

  @IsOptional()
  @IsString({ each: true })
  skills?: string[];
  @IsOptional()
  @IsArray({ message: 'Projects must be a string or valid project objects' })
  @ValidateNested({ each: true })
  @Type(() => ProjectDto)
  projects?: ProjectsField;
}

