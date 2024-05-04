'use client';
interface Props {
    title: string
}

export default function Title(props: Props) {
    const { title } = props;
    return <div>{title}</div>
}