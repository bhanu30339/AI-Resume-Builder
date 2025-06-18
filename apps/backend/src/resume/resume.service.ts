import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resume } from './entities/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
  ) {}

  async create(createResumeDto: CreateResumeDto) {
    const resume = this.resumeRepository.create(createResumeDto);
    console.log('Creating resume with:', createResumeDto);
    return this.resumeRepository.save(resume);
  }

  async findAll() {
  return this.resumeRepository.find(); 
}


  async findOne(id: string) {
  const resume = await this.resumeRepository.findOne({ where: { id } }); 
  if (!resume) {
    throw new NotFoundException(`Resume with ID ${id} not found`);
  }
  return resume;
}


  async update(id: string, updateResumeDto: UpdateResumeDto) {
    const resume = await this.findOne(id); // ensures it exists
    Object.assign(resume, updateResumeDto);
    return this.resumeRepository.save(resume);
  }

  async remove(id: string) {
    const resume = await this.findOne(id);
    return this.resumeRepository.remove(resume);
  }
}
