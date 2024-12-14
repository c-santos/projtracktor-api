import { Column } from 'typeorm';

export class Tag {
    @Column()
    name: string;

    @Column({ nullable: true })
    color: string;
}
