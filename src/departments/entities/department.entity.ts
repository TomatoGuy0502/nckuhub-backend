import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Course } from '../../courses/entities/course.entity'

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  departmentCode: string

  @OneToMany(() => Course, (course) => course.department)
  course: Course[]
}
