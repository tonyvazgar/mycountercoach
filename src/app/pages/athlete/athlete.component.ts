import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SessionTemplate } from '../../models/session.model';
import { SessionService } from '../../services/session.service';
import { AthleteResult } from '../../models/result.model';

const RESULTS_KEY = 'mycountercoach_results';

@Component({
  selector: 'app-athlete',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './athlete.component.html',
  styleUrl: './athlete.component.css',
})
export class AthleteComponent implements OnInit {
  form!: FormGroup;
  session!: SessionTemplate;
  results: AthleteResult = {};

  // 🔴 Simula el template que vendría del coach
  sessionTemplate = {
    exercises: [
      {
        name: 'Sentadilla',
        columns: [
          { label: 'Peso', type: 'number' },
          { label: 'Reps', type: 'number' },
        ],
      },
      {
        name: 'Plancha',
        columns: [{ label: 'Tiempo', type: 'time' }],
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
  ) {
    const data = this.sessionService.getSession();
    if (!data) {
      alert('No hay sesión activa');
      return;
    }
    this.session = data;
  }

  ngOnInit() {
    this.form = this.fb.group({
      athleteName: [''],
      exercises: this.fb.array([]),
    });

    const saved = localStorage.getItem(RESULTS_KEY);
    if (saved) {
      this.results = JSON.parse(saved);
    }

    this.buildFromTemplate();
  }

  get exercises(): FormArray {
    return this.form.get('exercises') as FormArray;
  }

  buildFromTemplate() {
    this.sessionTemplate.exercises.forEach((ex) => {
      this.exercises.push(
        this.fb.group({
          name: [ex.name],
          values: this.fb.array(
            ex.columns.map((col) =>
              this.fb.group({
                label: [col.label],
                type: [col.type],
                value: [''],
              }),
            ),
          ),
        }),
      );
    });
  }

  getValues(i: number): FormArray {
    return this.exercises.at(i).get('values') as FormArray;
  }

  finishSession() {
    console.log(this.form.value);
  }
  updateResult(exIndex: number, colIndex: number, value: any) {
    if (!this.results[exIndex]) {
      this.results[exIndex] = {};
    }
    this.results[exIndex][colIndex] = value;

    localStorage.setItem(RESULTS_KEY, JSON.stringify(this.results));
  }

  finish() {
    console.log('Resultados atleta:', this.results);
    alert('Sesión terminada (ver consola)');
    localStorage.removeItem(RESULTS_KEY);
    this.sessionService.clearSession();
    alert('Sesión terminada');
  }


}
