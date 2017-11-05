import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp' 
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
class ListContacts extends Component{
		
		static propTypes = {
					contacts: PropTypes.array.isRequired,
	                onDeleteContact: PropTypes.func.isRequired
		}

        state = {
        	query:''
        }

        updateQuery = (query)=>{
        	this.setState({query:query.trim()})
        }

        showAll = () => {
        	this.setState({query:''})
        }

		render() {

			const {onDeleteContact, onNavigate, contacts} = this.props;
			console.log("hey");
			console.log(onDeleteContact);
			console.log("yo");
			const {query} = this.state;

            let showingContact;
            if (query){
            	const match = new RegExp(escapeRegExp(this.state.query), 'i');
            	showingContact = contacts.filter((contact)=>match.test(contact.name));

            }else{
            	showingContact = contacts;
            }

            showingContact.sort(sortBy('name'));



			return (
			<div className='list-contacts'>
			    <div className='list-contacts-top'>
			    	<input
			    		className='search-contacts'
			    		type='text'
			    		placeholder='search contacts'
			    		value={query}
			    		onChange={(event)=>this.updateQuery(event.target.value)}/>

			    	<Link to="/create" className="add-contact">Add Contact</Link>
			    </div>
			    {showingContact.length !== contacts.length && (
			    	<div className='showing-contacts'>
			    		<span>showing {showingContact.length} of {contacts.length}</span>
			    		<button onClick={this.showAll}>showing all</button>
			    	</div>
			    )}
				<ol className="contact-list">
					{showingContact.map(contact=>
						<li className="contact-list-item" key={contact.id}>
							<div className="contact-avatar" style={
								{
									backgroundImage:`url(${contact.avatarURL})`,
								}
							}></div>
							<div className='contact-details'>
								<p>{contact.name}</p>
								<p>{contact.email}</p>
							</div>
							<button className='contact-remove' onClick={()=>this.props.onDeleteContact(contact)}>
								Remove
							</button>
						</li>
					)}
				</ol>
			</div>
		)}
	}

export default ListContacts;