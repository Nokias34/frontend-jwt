import React, { Component } from "react";
import ArticleDataService from "../services/article.service";
import AuthService from "../services/auth.service";


export default class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeDeveloper = this.onChangeDeveloper.bind(this);
    this.onChangeTamat = this.onChangeTamat.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.newArticle = this.newArticle.bind(this);


    this.state = {
      id: null,
      title: "",
      description: "",
      genre: "",
      developer: "",
      tamat: "", 
      published: false,
      userId : AuthService.getCurrentUser().id,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value
    });
  }

  onChangeDeveloper(e) {
    this.setState({
      developer: e.target.value
    });
  }

  onChangeTamat(e) {
    this.setState({
      tamat: e.target.value
    });
  }

  saveArticle() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      genre: this.state.genre,
      developer: this.state.developer,
      tamat: this.state.tamat,
      userId : this.state.userId
    };

    ArticleDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          genre: response.data.genre,
          developer: response.data.developer,
          tamat: response.data.tamat,
          published: response.data.published,
          userId: response.data.userId,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newArticle() {
    this.setState({
      id: null,
      title: "",
      description: "",
      genre: "",
      developer: "",
      tamat: "",
      published: false,
      userId : AuthService.getCurrentUser().id,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newArticle}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                required
                value={this.state.genre}
                onChange={this.onChangeGenre}
                name="genre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="developer">Developer</label>
              <input
                type="text"
                className="form-control"
                id="developer"
                required
                value={this.state.developer}
                onChange={this.onChangeDeveloper}
                name="developer"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tamat">tamat</label>
              <input
                type="text"
                className="form-control"
                id="tamat"
                required
                value={this.state.tamat}
                onChange={this.onChangeTamat}
                name="tamat"
              />
            </div>

            <button onClick={this.saveArticle} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }

}
