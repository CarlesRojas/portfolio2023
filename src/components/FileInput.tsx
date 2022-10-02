import s from "@styles/components/FileInput.module.scss";
import Image from "next/future/image";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { RiAddLine } from "react-icons/ri";

interface FileInputProps {
    name: string;
    accept: string;
    className: string | undefined;
    defaultImage?: string;
    imageSizes: string;
}

const FileInput = ({ name, accept, className, defaultImage, imageSizes }: FileInputProps) => {
    const [dragActive, setDragActive] = useState(false);
    const [image, setImage] = useState(defaultImage);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = function (event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = function (event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = function (event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);

        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setImage(URL.createObjectURL(event.dataTransfer.files[0]));
            if (inputRef.current) inputRef.current.files = event.dataTransfer.files;
        }
    };

    const handleChange = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (event.target.files && event.target.files[0]) setImage(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <div className={`${s.fileInput} ${className} ${dragActive ? s.active : ""} ${image ? s.hide : ""}`}>
            <input
                type="file"
                id={name}
                name={name}
                accept={accept}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onChange={handleChange}
                ref={inputRef}
            />

            <div className={s.border}></div>
            <RiAddLine />

            {image && <Image src={image} alt="icon for project" fill sizes={imageSizes} priority />}
        </div>
    );
};

export default FileInput;
