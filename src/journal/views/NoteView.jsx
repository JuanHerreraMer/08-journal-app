import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import moment from "moment/moment"
import 'moment/locale/es'
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { ImageGallery } from "../components"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

moment.locale('es');

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const { body, title, date, onInputChange, formState} = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        // return newDate.toUTCString();
        
        // return moment(newDate).format('dddd MMM Do YYYY, h:mm:ss a');
        return moment(newDate).format('LLLL');
    }, [date])

    const fileInputRef = useRef();

    useEffect(() => {
      dispatch( setActiveNote(formState) );
    }, [formState])

    useEffect(() => {
      if( messageSaved.length > 0 ){
        Swal.fire('Nota actualizada', messageSaved, 'success');
      }
    }, [ messageSaved ])
    
    
    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ));
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

  return (
    <Grid container 
        className='animate__animated animate__fadeIn animate__faster'
        direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='ligth'>{ dateString }</Typography>
        </Grid>
        <Grid item>

            <input 
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />
            <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadFileOutlined />
            </IconButton>

            <Button 
                color="primary" 
                sx={{ padding: 2 }}
                onClick={ onSaveNote }
                disabled={ isSaving }
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un t??tulo"
                label="T??tulo"
                sx={{ border: 'none', mb: 1 }}
                value={ title }
                name="title"
                onChange={ onInputChange }
            />
            
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="??Qu?? sucedi?? en el d??a de hoy?"
                minRows={ 5 }
                value={ body }
                name="body"
                onChange={ onInputChange }
            />            
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color='error'
            >
                <DeleteOutline />
                Borrar
            </Button>

        </Grid>

        {/* Image gallery */}
        <ImageGallery images={ note.imageUrls }/>
    </Grid>
  )
}
