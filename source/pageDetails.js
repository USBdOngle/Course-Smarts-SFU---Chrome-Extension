export class pageDetails{
    constructor(){
        this._data = {};
        this._data['course'] = this._extractCourse(window.location.href);
        this._data['profs'] = this._extractProfs();

    }
    get data(){
        return this._data;
    }
    _extractCourse(){
        let url = window.location.href;
        let mid = url.lastIndexOf('/'); //number portion of course name after this
        let secondHalf = url.substring(mid+1, url.lastIndexOf('.')).toUpperCase();
        url = url.substring(0,mid); //remove portion of string we just extracted
        let firstHalf = url.substring(url.lastIndexOf('/')+1).toUpperCase();
        return firstHalf + ' ' + secondHalf
    }
    _extractProfs() {
        let profs = document.getElementsByClassName('main-section');
        let profList = [];
        for (let i = 0; i < profs.length; i++) {
            let potential = profs[i].getElementsByTagName('td')[1].innerText.trim();
            if (potential.length > 0 && !profList.includes(potential) && potential !== 'Sessional' && potential !== 'Faculty') {
                profList.push(potential);
            }
        }
        return profList;
    }
}

