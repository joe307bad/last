import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Planet {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column({ nullable: false })
  exampleField: number;
}
