import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { CourseEntity } from '../../courses/entities/course.entity'

@Entity('departments')
export class DepartmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  departmentCode: string

  @OneToMany(() => CourseEntity, (course) => course.department)
  course: CourseEntity[]
}
