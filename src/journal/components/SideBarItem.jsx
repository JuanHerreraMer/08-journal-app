import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/"

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 15 
        ? title.substring(0, 15) + '....'
        : title;
    }, [ title ])

    const onActivatedNote = () => {

        const activeNote = {
            id: id,
            title: title,
            body: body,
            date: date,
            imageUrls: imageUrls,
        }

        dispatch( setActiveNote( activeNote ) );

    }

  return (
    <ListItem disablePadding>
        <ListItemButton
            onClick={ onActivatedNote }
        >
            <ListItemIcon>
                <TurnedInNot />    
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle }/>
                <ListItemText secondary={ body }/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}