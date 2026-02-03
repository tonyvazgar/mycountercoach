import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrl: './create-session.component.css',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
})
export class CreateSessionComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      rules: [''],
      exercises: this.fb.array([]),
    });
  }

  get exercises(): FormArray {
    return this.form.get('exercises') as FormArray;
  }

  addExercise() {
    const exercise = this.fb.group({
      name: [''],
      columns: this.fb.array([]),
    });

    this.exercises.push(exercise);
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
  }

  addColumn(exIndex: number) {
    const columns = this.exercises.at(exIndex).get('columns') as FormArray;

    columns.push(
      this.fb.group({
        label: [''],
        type: ['number'],
      }),
    );
  }

  getColumns(exerciseIndex: number): FormArray {
    return this.exercises.at(exerciseIndex).get('columns') as FormArray;
  }
  getColumnGroup(exerciseIndex: number, columnIndex: number): FormGroup {
    return this.getColumns(exerciseIndex).at(columnIndex) as FormGroup;
  }
  getExerciseGroup(index: number): FormGroup {
    return this.exercises.at(index) as FormGroup;
  }

  saveSession() {
    const template = {
      id: crypto.randomUUID(),
      ...this.form.value,
    };

    this.sessionService.setSession(template);
    this.router.navigate(['/join']);
  }
}
