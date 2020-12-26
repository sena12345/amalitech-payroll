import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
interface Notice {
	success: boolean;
	message: string;
}
@Injectable({
	providedIn: 'root'
})
export class ObserverService {
	private notice: BehaviorSubject<Notice> = new BehaviorSubject<Notice>({ success: true, message: null });
	private _notice$: Observable<Notice> = this.notice.asObservable();
	public status: Notice;

	private showProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private _showProgress$: Observable<boolean> = this.showProgress.asObservable();
	private show: boolean = false;

	constructor() {
		this._notice$.subscribe((result) => {
			this.status = result;
			console.log(this.status.message, this.status.success);
		});
		this._showProgress$.subscribe((show) => {
			this.show = show;
		});
	}

	public updateNotice(notice: Notice) {
		this.notice.next(notice);
		// console.log(this.status.message, this.status.success);
	}

	public loadProgress(show?: boolean) {
		this.showProgress.next(show);
	}
}
