import { PrimaryGeneratedColumn } from "typeorm";

export default class BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
}