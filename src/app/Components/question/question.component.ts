import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/Service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  counter: number = 60;
  points: number = 0;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  intervalTimer: any;
  progress: string = "0";
  isCompleted: boolean = false;

  constructor(private service: QuestionService) { }
  ngOnInit(): void {
    this.name = localStorage.getItem("UserName")! ?localStorage.getItem("UserName")! : "Guest";

    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions() {
    this.service.getQuestions()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {
    if (currentQno === this.questionList.length) {
      this.isCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;

      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgress();
      }, 1000);

    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgress();
      }, 1000);
      this.points -= 10;
    }
  }
  startCounter() {
    this.intervalTimer = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.intervalTimer.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.intervalTimer.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";
  }
  getProgress() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }
}
