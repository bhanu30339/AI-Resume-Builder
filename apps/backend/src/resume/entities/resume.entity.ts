import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  fullName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column('json', { nullable: true })
  education: any; // Array of education objects

  @Column('json', { nullable: true })
  experience: any; // Array of experience objects

  @Column('json', { nullable: true })
  skills: string[]; // List of skills

  @Column('json', { nullable: true })
  projects: any; // Array of projects

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  github: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
