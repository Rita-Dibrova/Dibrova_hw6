import React from 'react';
import './LoginFormStyles.scss'
import styles from './LoginForm.module.css';

class LoginForm extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      input: {
        userLogin: "",
        userPassword: ""
      },
      errors: {}
    };     

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }   

  handleChange(e) {
    let input = this.state.input;
    input[e.target.name] = e.target.value;  
    this.setState({input});
  }   

  handleSubmit(e) {
    e.preventDefault(); 
    if(this.validate()){
      console.log("submit success");    
    }
    else {
      this.setState({
        inputClass: "invalid"
      })
    }
  }  

  validate(){
    let input = this.state.input;
    let errors = {};
    let isValid = true; 

    if (!input["userLogin"]) {
      isValid = false;
      errors["userLogin"] = "Введіть Ваш логін";
    }  

    if (!input["userPassword"]) {
      isValid = false;
      errors["userPassword"] = "Введіть Ваш пароль";
    }
    else if (typeof input["userPassword"] !== "undefined") {        
      let pattern = new RegExp(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g);
      if (!pattern.test(input["userPassword"])) {
        isValid = false;
        errors["userPassword"] = "Пароль має бути не менше 6 знаків, та містити букви різного регістру, цифри та спеціальні символи";
      }
    } 

    this.setState({
      errors: errors
    });  

    return isValid;
  }     

  render() {
    return (
      <div>
        <form className="main-form" onSubmit={this.handleSubmit}> 
        <h1>Вхід на сайт</h1>
          <div className={styles.form}>
            <input 
              name='userLogin' 
              type='text' 
              placeholder="Введіть логін" 
              value={this.state.input.userLogin}
              onChange={this.handleChange}     
              className={this.state.inputClass}         
              />
            <div className={styles.error}>{this.state.errors.userLogin}</div>
          </div>
          <div className={styles.form}>
            <input               
              name="userPassword" 
              type="password" 
              placeholder="Введіть пароль" 
              value={this.state.input.userPassword}
              onChange={this.handleChange}
              className={this.state.inputClass}   
              /> 
            <div className={styles.error}>{this.state.errors.userPassword}</div>
          </div>  
          <button className="button"> Ввійти </button>
        </form>
      </div>
    );
  }
}  
export default LoginForm;