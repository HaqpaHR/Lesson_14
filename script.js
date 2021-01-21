function MilitaryResource(type, health, distance) {
   this.type = type;
   this.health = this.maxHealth = health;
   this.distance = this.maxDistance = distance;
}

MilitaryResource.prototype.isReadyToMove = function() {
   return this.distance >= 100;
};
MilitaryResource.prototype.isReadyToFight = function() {
   return this.health >= 100;
};

MilitaryResource.prototype.restore = function() {
   this.health = this.maxHealth;
   this.distance = this.maxDistance;
}
MilitaryResource.prototype.clone = function() {
   return new MilitaryResource(this.type, this.health, this.distance)
};

let tanks = new MilitaryResource('tanks', 1000, 200);
let mashineGunner = new MilitaryResource('MashGunner', 100, 200);
let badTank = new MilitaryResource('bad tank', 80, 200)
console.log(tanks);
console.log(tanks.isReadyToFight());
console.log(tanks.isReadyToMove());
console.log(tanks.clone());
tanks.health = 5;
console.log(tanks)
console.log(tanks.restore());
console.log(tanks)


function Squad(...defaultResources) {
   this.squad = [];
   if (defaultResources) this.combineResources(defaultResources);
}
Squad.prototype.combineResources = function(MilitaryResource) {
   MilitaryResource.forEach((res) => this.squad = this.squad.concat(res));
 }

Squad.prototype.isReadyToMove = function() {
      let result = true;
      this.squad.forEach((move) => result = (!move.isReadyToMove() ? false : result) );
      return result;
}
Squad.prototype.isReadyToFight = function() {
   let result = true;
   this.squad.forEach((health) => result = (!health.isReadyToMove() ? false : result) );
   return result;
}
Squad.prototype.restore = function() {
   this.squad.forEach((rest) => result = rest.restore());
}

Squad.prototype.getReadyToMoveResources = function() {
  let result = [];
  for(let i = 0; i < this.squad.length; i++) { 
     if(this.squad[i].isReadyToMove() && this.squad[i].isReadyToFight())
     result.push(this.squad[i]);
  }
  return result;
}
Squad.prototype.clone = function(defaultResources) {
   return new Squad(defaultResources);
}

let squad = new Squad([tanks, tanks, mashineGunner]);
console.log(squad)
squad.combineResources([badTank])
squad.getReadyToMoveResources()
console.log(squad.isReadyToMove());
console.log(squad.isReadyToMove());
console.log(squad.isReadyToFight());
console.log(squad.getReadyToMoveResources());
squad.restore();
console.log(squad.isReadyToMove());
console.log(squad.clone(squad));