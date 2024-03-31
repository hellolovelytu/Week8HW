class Kid { /*Declare a class called Kid that has three paramether and one method to show the kid information*/
    constructor (name,age,school){
        this.name=name;
        this.age=age;
        this.school=school;
        this.activities =[];
    }
    describe(){
        return `${this.name} is ${this.age} and a student of ${this.school}.`;
    }
}

class Activity {/*Declare a class called Activity with three parameters and one method to catch errors */
    constructor(name, timePeriod,frequency) {
        this.name=name;
        this.timePeriod=timePeriod;
        this.frequency=frequency;
    }
    addActivity(activity) {
        if (activity instanceof Activity){this.activities.push (activity);
        } else {
        throw new Error (`You can only add an instance of activity. Argument is not an activity: ${activity}`);
        }
    }
}

class Menu {/*Declare a class called Menu with 9 methods for starting, showing options, asking for inputs, alternating stored data and presenting collected data */
    constructor() {
        this.kids=[];
        this.selectedKid = null;
    }
    start(){/*This is start function for what presenting to users first and assigning which function would be use based on users' choices*/
        let selection = this.showMainMenuOptions();
        while (selection != '0'){
            switch (selection){
                case '1':
                    this.createKid();
                    break;
                case '2':
                    this.viewKid();
                    break;
                case '3':
                    this.deleteKid();
                    break;
                case '4':
                    this.displayAllKids();
                    break;
                default:
                    selection = 0;    
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }
    showMainMenuOptions(){/*How the menu is showing to user by using template literal*/
        return prompt(`
        0) Exit
        1) Create kid
        2) View kid
        3) Delete kid
        4) Display all kids
        `);
    }

    showActivitiesMenuOptions(ActivitiesInfo){/*For a sub-menu using template literal*/
        return prompt(`
        0) Back
        1) Add activity
        2) Delete activity
        --------------------------
        ${ActivitiesInfo}
        `);
    }
    displayAllKids(){/*This function helps displaying all the data that we collected through all the prompts*/
        let kidsDetails = '';
    for (let i = 0; i < this.kids.length; i++) {/*Show kid information after all Kids parameters' inputs*/
        kidsDetails += `Kid Name: ${this.kids[i].name} - Age: ${this.kids[i].age} - School: ${this.kids[i].school}\n`;

        if (this.kids[i].activities.length > 0) {/*Show kid activities after all activities parameters' inputs*/
            kidsDetails += 'Activities:\n';
            for (let j = 0; j < this.kids[i].activities.length; j++) {
                kidsDetails += `${j}) ${this.kids[i].activities[j].name} - Time Period: ${this.kids[i].activities[j].timePeriod} - Frequency: ${this.kids[i].activities[j].frequency}\n`;
            }
        } else {
            kidsDetails += 'No activities assigned.\n';
        }

        kidsDetails += '\n';
    }
    alert(kidsDetails);
    }

    createKid(){/*Ask for inputs for kids information*/
        let name= prompt('Enter name for kid: ');
        let age= prompt('Enter age for kid: ');
        let school= prompt('Enter school name for kid: ');
        this.kids.push(new Kid(name,age,school));
    }

    viewKid(){/*To view information that users entered for kids and prompt for more inputs regarding their activities*/
        let index = prompt ('Enter the index of the kid schedule you wish to view: ');/*View the kid data in the system */
        if (index>-1 && index < this.kids.length) {
            this.selectedKid = this.kids[index];
            let description= 'Kid Name: ' + this.selectedKid.name + '\n';

            for (let i=0; i< this.selectedKid.activities.length; i++){/*show stored data for activities*/
                description += i + ')' + this.selectedKid.activities[i].name + ' - ' + this.selectedKid.activities[i].timePeriod + ' - ' + this.selectedKid.activities[i].frequency + '\n';
            }
            let selection= this.showActivitiesMenuOptions(description);/*Give options for add more activities or delete some*/
            switch (selection){
                case '1':
                    this.addActivity();
                    break;
                case '2':
                    this.deleteActivity();
                    default:
                        break;
            }
        }
    }

    deleteKid() {/*To delete data of kids*/
        let index = prompt ('Enter the index of the kid schedule you wish to delete:');
        if (index > -1 && index < this.kids.length) {
            this.kids.splice (index,1);
        }
    }

    addActivity(){/*To add more activities*/
        let name = prompt('Enter name for new activity: ');
        let timePeriod = prompt('Enter time period for new activity: ');
        let frequency = prompt('Enter the frequency of this activity: ');
        this.selectedKid.activities.push(new Activity (name, timePeriod, frequency)); 
    }

    deleteActivity(){/*to delete activities*/
        let index = prompt('Enter the index of the activity you wish to delete: ');
        if (index>-1 && index < this.selectedKid.activities.length){
            this.selectedKid.activities.splice (index,1);
        }
    }
}
let menu=new Menu();
menu.start();