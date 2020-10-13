import React, {Component, Fragment} from 'react';
import './Dashboard.scss'
import { connect } from 'react-redux';
import { addDataToAPI, getDataFromAPI, updateDataFromAPI, deleteDataFromAPI } from '../../../config/redux/action';

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: '',
        button: 'simpan',
        nodeId: ''
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid);
    }

    handleNotes = () => {
        const {title, content, button, nodeId} = this.state;
        const {saveNotes, updateNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid,
        }
        if(button == "simpan"){
            saveNotes(data);
        }else {
            data.noteId = nodeId;
            updateNotes(data);
        }
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    updateNotes = (note) => {
        console.log(note)
        this.setState({
            title: note.data.title,
            content: note.data.content,
            button: 'update',
            nodeId: note.id
        })
    }

    cancelUpdate = () => {
        this.setState({
            title: '',
            content: "",
            button: 'simpan'
        })
    }

    deleteNote = (e, note) => {
        e.stopPropagation();
        const {deleteNote} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id,
        }
        deleteNote(data);
    }

    render() {
        const {title, content, button} = this.state;
        const {notes} = this.props;
        return(
            <div className="container">
                <div className="input-form">
                    <input placeholder="title" id="title" className="input-title" value={title} onChange={this.handleChangeText} />
                    <textarea placeholder="content" id="content" className="input-content" value={content} onChange={this.handleChangeText} >

                    </textarea>
                    <div className="button-wrapper">
                        {
                            button == 'update' ? (
                                <button className="save-btn cancel" onClick={this.cancelUpdate}>cancel</button>
                            ) : <div />
                        }
                        <button className="save-btn" onClick={this.handleNotes}>{this.state.button}</button>
                    </div>
                </div>
                <hr/>
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id} onClick={() => this.updateNotes(note)}>
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                            <div className="delete-btn" onClick={(e) => this.deleteNote(e, note)}>x</div>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                        
                    ) : null
                }
                
            </div>
        );
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataFromAPI(data)),
    deleteNote: (data) => dispatch(deleteDataFromAPI(data))
})

export default connect(reduxState, reduxDispatch)(Dashboard);