import { useThemeApp } from '@/hooks/use-theme-app';
import { useRef, useState } from 'react';
import { BoxApp } from '../box/box-app';
import { IconApp } from '../icon/icon-app';
import { listaDeIcones } from '@/config/lista-de-icones';
import { useSnackbar } from '../snack-bar/use-snack-bar';

interface InputFileProps {
  maxSizeInMB?: number;
  allowedTypes?: string[];
  multiple?: boolean;
  onChange?: (files: FileList) => void;
  tituloArquivosAceitos?: string;
}

export function InputFile(props: InputFileProps) {
  const { cores, borderRadius, backgroundColor } = useThemeApp();
  const { show } = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.types) {
      if (Array.from(e.dataTransfer.types).includes('Files')) {
        setDragActive(true);
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (props.allowedTypes) {
        for (const file of Array.from(e.dataTransfer.files)) {
          const fileType = file.type.split('/');
          if (fileType.length === 2) {
            if (
              !props.allowedTypes.some((type) =>
                type.includes(fileType[1]),
              ) &&
              !props.allowedTypes.some((type) =>
                type.includes(fileType[0]),
              )
            ) {
              show('Tipo de arquivo não permitido');
              return;
            }
          }
        }
      }
      props.onChange?.(e.dataTransfer.files);
    }
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      props.onChange?.(e.target.files);
    }
  };

  return (
    <BoxApp
      display='flex'
      alignItems='center'
      flexDirection='column'
      justifyContent='center'
      width='100%'
      height='150px'
      borderRadius={borderRadius}
      border={`1px dashed ${cores.primary.main}`}
      cursor='pointer'
      transition='background-color 0.3s'
      position='relative'
      backgroundColor={dragActive ? '#eaf4ff' : backgroundColor.default}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleChooseFile}
    >
      <IconApp
        icon={dragActive ? listaDeIcones.pastaAberta : listaDeIcones.pasta}
        fontSize={80}
      />
      <p
        style={{
          color: cores.text.secondary,
          fontSize: 16,
          marginBottom: 4,
        }}
      >
        Arraste ou selecione arquivos{' '}
        <span
          style={{
            color: cores.primary.main,
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleChooseFile();
          }}
        >
          aqui
        </span>
      </p>
      {props.tituloArquivosAceitos && (
        <p style={{ color: cores.text.secondary, fontSize: 13 }}>
          {props.tituloArquivosAceitos}
        </p>
      )}
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple={props.multiple}
        accept={props.allowedTypes?.join(',')}
      />
    </BoxApp>
  );
}
