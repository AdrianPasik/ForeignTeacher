import { Component, input } from '@angular/core';
import { Progress } from '../../services/persistence/progress';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-result',
  imports: [CommonModule],
  templateUrl: './display-result.html',
  styleUrl: './display-result.css',
})
export class DisplayResult {
  progressService = input.required<Progress | null>();
}
