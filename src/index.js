import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";

class FilmRow extends React.Component {
  render() {
    const film = this.props.film;
    const title = film.title;
    const release_year = film.release_year;
    const description = film.description;
    const length = film.length;
    const rating = film.rating
    const film_id = film.film_id

    return (
      <tr>
        <td>{title}</td>
        <td>{release_year}</td>
        <td>{description}</td>
        <td>{length}</td>
        <td>{rating}</td>
        <td>{film_id}</td>
       
      </tr>
    );
  }
}

class FilmTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top10Films: [],
      allFilms: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/films")
      .then((response) => response.json())
      .then((jsonData) => {
        const FILMS = jsonData;
        this.setState({
          top10Films: FILMS,
          allFilms: jsonData.total,
        });
      });
  }
  render() {
    const rows = [];
    const filterText = this.props.filterText;

    this.state.top10Films.forEach((film) => {
      if (film.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }
      rows.push(<FilmRow film={film} key={film.title} />);
    });

    return (
      <div>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Release Year</td>
            <td>Description</td>
            <td>Length (minutes)</td>
            <td>Rating (US)</td>
            <td>ID</td>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search by title..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </form>
    );
  }
}

// class ActorRow extends React.Component {
//   render() {
//     const actor = this.props.actor;
//     const first_name = this.props.actor.first_name;
//     const last_name = this.props.actor.last_name;

//     return (
//       <tr>
//         <td>{first_name}</td>
//         <td>{last_name}</td>
//         <td>
//           <button>EDIT</button>
//           <button>DELETE</button>
//         </td>
//       </tr>
//     );
//   }
// }

// class ActorTable extends React.Component {
//   render() {
//     const rows2 = [];
//     const filterText2 = this.props.filterText2;

//     this.props.actors.forEach((actor) => {
//       if (
//         actor.first_name.toLowerCase().indexOf(filterText2.toLowerCase()) === -1
//       ) {
//         return;
//       }
//       rows2.push(<ActorRow actor={actor} key={actor.first_name} />);
//     });

//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>ACTIONS</th>
//           </tr>
//         </thead>
//         <tbody>{rows2}</tbody>
//       </table>
//     );
//   }
// }

// class ActorSearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleFilterText2Change = this.handleFilterText2Change.bind(this);
//   }

//   handleFilterText2Change(e) {
//     this.props.onFilterText2Change(e.target.value);
//   }
//   render() {
//     return (
//       <form>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={this.props.filterText2}
//           onChange={this.handleFilterText2Change}
//         />
//       </form>
//     );
//   }
// }

// const ACTORS = [
//   { actor_id: 1, first_name: "PENELOPE", last_name: "GUINESS" },
//   { actor_id: 2, first_name: "NICK", last_name: "WAHLBERG" },
//   { actor_id: 3, first_name: "ED", last_name: "CHASE" },
//   { actor_id: 4, first_name: "JENNIFER", last_name: "DAVIS" },
//   { actor_id: 5, first_name: "JOHNNY", last_name: "LOLLOBRIGIDA" },
// ];

// class AddActor extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstNameInputText: "",
//       lastNameInputText: "",

//     };
//     this.firstNameInputChange = this.firstNameInputChange.bind(this);
//     this.lastNameInputChange = this.lastNameInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   firstNameInputChange(event) {
//     this.setState({
//       firstNameInputText: event.target.value,
//     });
//   }
//   lastNameInputChange(event) {
//     this.setState({
//       lastNameInputText: event.target.value,
//     });
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//     alert(
//       `you added: \n first name: ${this.state.firstNameInputText} \n 
//            last name: ${this.state.lastNameInputText}`
//     );
//   }

//   render() {
//     return (
//       <>
//         <form onSubmit={this.handleSubmit}>
//           <>
//             <input
//               type="text"
//               name="first_name"
//               placeholder="First Name"
//               value={this.firstNameInputText}
//               onChange={this.firstNameInputChange}
//             />

//             <input
//               type="text"
//               name="last_name"
//               placeholder="Last Name"
//               value={this.lastNameInputText}
//               onChange={this.lastNameInputChange}
//             />
//           </>
//           <input type="submit" value="Submit" />
//         </form>
//       </>
//     );
//   }
// }

class AddFilm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          filmTitleInputText: "",
          filmReleaseYearInputText: "",
          filmDescriptionInputText:"",
          filmLengthInputText:"",
          filmRatingInputText:"",
          
          postId:null,
          
        };
        this.filmTitleInputChange = this.filmTitleInputChange.bind(this);
        this.filmReleaseYearInputChange =this.filmReleaseYearInputChange.bind(this);
        this.filmDescriptionInputChange=this.filmDescriptionInputChange.bind(this);
        this.filmLengthInputChange=this.filmLengthInputChange.bind(this);
        this.filmRatingInputChange=this.filmRatingInputChange.bind(this);


        this.handleSubmit = this.handleSubmit.bind(this);
      }
    

    componentDidMount2(){
        const requestOptions= {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({title: this.state.filmTitleInputText, 
              release_year:this.state.filmReleaseYearInputText, 
              description:this.state.filmDescriptionInputText, 
              length:this.state.filmLengthInputText, 
              rating:this.state.filmRatingInputText}  )
        }
        fetch('http://localhost:8080/addFilm', requestOptions)
        .then((response)=>response.json())
        .then((data)=> this.setState({postId: data.id}))

       

        


    }
    


 
  filmTitleInputChange(event) {
    this.setState({
      filmTitleInputText: event.target.value,
    });
  }
  filmReleaseYearInputChange(event) {
    this.setState({
      filmReleaseYearInputText: event.target.value,
    });
  }
  filmDescriptionInputChange(event){
    this.setState({
      filmDescriptionInputText: event.target.value,
    })
  }
  filmLengthInputChange(event){
    this.setState({
      filmLengthInputText: event.target.value,
    })
  }

filmRatingInputChange(event){
  this.setState({
    filmRatingInputText: event.target.value,
  })
}
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `you added: \n film: ${this.state.filmTitleInputText} \n 
           release year: ${this.state.filmReleaseYearInputText}`
    );
    this.componentDidMount2()
  }
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.filmTitleInputText}
              onChange={this.filmTitleInputChange}
            />

            <input
              type="text"
              name="release_year"
              placeholder="Release year"
              value={this.state.filmReleaseYearInputText}
              onChange={this.filmReleaseYearInputChange}
            />

<input
              type="text"
              name="description"
              placeholder="description"
              value={this.state.filmDescriptionInputText}
              onChange={this.filmDescriptionInputChange}
            />
            <input
              type="text"
              name="length"
              placeholder="length"
              value={this.state.filmLengthInputText}
              onChange={this.filmLengthInputChange}
            />
             <input
              type="text"
              name="rating"
              placeholder="rating"
              value={this.state.filmRatingInputText}
              onChange={this.filmRatingInputChange}
            />
          </>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

class DeleteFilm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      filmIDInputText: "",
    };

    this.filmIDInputChange=this.filmIDInputChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }


  componentDidMount(){
    fetch('http://localhost:8080/deleteFilm' + this.state.filmIDInputText, {method: 'DELETE'}) 
    .then(()=>this.setState({status:'Delete successful'}));
    

  }

  filmIDInputChange(event){
    this.setState({
      filmIDInputText: event.target.value,
    })
  }

  handleSubmit(event){
    event.preventDefault();
    alert(
      `you deleted: \n film ID: ${this.state.filmIDInputText} \n 
           `
    );
    this.componentDidMount()

  }

  render(){
    return(

      <>

      <form onSubmit = {this.handleSubmit}>
      <>
      <input type= "text"
      name= "film_id"
      placeholder = "ID to delete"
        value={this.state.filmIDInputText}
        onChange={this.filmIDInputChange}
      />

      </>
      <input type="submit" value="Submit" />

      </form>
      
      </>
     
      )
  }

}

class DaddyClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      filterText2: "",
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleFilterText2Change = this.handleFilterText2Change.bind(this);
  }
  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }

  handleFilterText2Change(filterText2) {
    this.setState({
      filterText2: filterText2,
    });
  }

  render() {
    return (
      <div id="wholeThing">


        <div>
          <h1>Film Database</h1>
        </div>

        <div id="addFilm">
          <div id="addFilmHead">Add a film to the database:</div>
          <div id="addFilmBar">
            <AddFilm />
            <br />
            WARNING! Only US certificates are accepted as ratings. If you enter a non US rating your film will not be saved.
          </div>

        </div>
        <br />
        <div id = "delete film">
        Delete a film from the database:
        <DeleteFilm />

        </div>
        <div id="searchFilm">
          <div id="searchFilmHead">Search for a film:</div>
          <div id="SearchFilmBar">
            <SearchBar
              filterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
            />
            <FilmTable filterText={this.state.filterText} />
          </div>
        </div>

        {/* 
      <div id="searchActor">
          <div id="searchActorHead">Seacrh for an actor:</div>

          <div id="SearchActorBar">
            <ActorSearchBar
              filterText={this.state.filterText2}
              onFilterText2Change={this.handleFilterText2Change}
            />
            <ActorTable
              actors={this.props.actors}
              filterText2={this.state.filterText2}
            />
          </div>
        </div>

        <div id="addActor">
          <div id="AddActorHead">Add an actor to the database:</div>
          <div id="addActorBar">
            <AddActor />
          </div>
        </div> */}
        

     
      </div>

      
    );
  }
}

ReactDOM.render(
  <DaddyClass  />,

  document.getElementById("root")
);
