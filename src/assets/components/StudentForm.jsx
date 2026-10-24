import { Component } from 'react';

export default class StudentForm extends Component {
  // when editing, the fields start with the student's current info
  state = {
    name: this.props.editingStudent ? this.props.editingStudent.name : '',
    course: this.props.editingStudent ? this.props.editingStudent.course : '',
    age: this.props.editingStudent ? String(this.props.editingStudent.age) : '',
    error: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isValid() {
    const { name, course, age } = this.state;
    const ageNumber = Number(age);

    return (
      name.trim() !== '' &&
      course.trim() !== '' &&
      Number.isInteger(ageNumber) &&
      ageNumber >= 1 &&
      ageNumber <= 120
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ error: '' });

    if (!this.isValid()) {
      this.setState({ error: 'Please enter a valid name, course, and age (1 to 120).' });
      return;
    }

    const { name, course, age } = this.state;
    const { editingStudent, addStudent, updateStudent } = this.props;

    const student = {
      name: name.trim(),
      course: course.trim(),
      age: Number(age),
    };

    if (editingStudent) {
      updateStudent(editingStudent.id, student);
    } else {
      addStudent(student);
      this.setState({ name: '', course: '', age: '' });
    }
  };

  render() {
    const { name, course, age, error } = this.state;
    const { editingStudent, cancelEdit } = this.props;

    return (
      <form className="student-form" onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            name="name"
            placeholder="e.g. John Cruz"
            value={name}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Course
          <input
            name="course"
            placeholder="e.g. BSIT"
            value={course}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Age
          <input
            name="age"
            type="number"
            placeholder="e.g. 20"
            min="1"
            max="120"
            step="1"
            value={age}
            onChange={this.handleChange}
          />
        </label>

        <div className="form-buttons">
          <button type="submit">
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>

          {editingStudent && (
            <button type="button" className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>

        {error && <p className="form-error">{error}</p>}
      </form>
    );
  }
}