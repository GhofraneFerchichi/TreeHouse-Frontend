import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-list-command',
  templateUrl: './list-command.component.html',
  styleUrls: ['./list-command.component.css']
})
export class ListCommandComponent implements OnInit {
  commandes: any[] = [];

  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes() {
    this.commandeService.getCommandesWithProducts().subscribe((data: any[]) => {
      this.commandes = data;
    });
  }
}
