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
education: any;

@Column('json', { nullable: true })
experience: any;

@Column('json', { nullable: true })
skills: string[];

@Column('json', { nullable: true })
projects: any;

@Column({ nullable: true })
linkedin: string;

@Column({ nullable: true })
github: string;

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;
}
