function classifier(input) {
    
  if (input.length === 0) {
    // Handle empty input array by returning an empty result
    return { noOfGroups: 0 };
  }

// Create a copy of the input array to avoid modifying the original array
const inputCopy = input.slice();

function calculateAge(dob) {
const currentDate = new Date('2019-01-01'); // Assuming the current year is 2019
const birthDate = new Date(dob);
const ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
return ageInYears;
}

inputCopy.sort((a, b) => calculateAge(a.dob) - calculateAge(b.dob));

const groups = {};
let groupCounter = 1;
const maxGroupSize = 3;
const maxAgeDifference = 5;

for (const student of inputCopy) {
const age = calculateAge(student.dob);
let assigned = false;

for (let i = 1; i <= groupCounter; i++) {
  const groupKey = `group${i}`;
  const group = groups[groupKey];

  if (!group) {
    groups[groupKey] = {
      members: [
        {
          name: student.name,
          dob: student.dob,
          regNo: student.regNo,
          age,
        },
      ],
      oldest: age,
      sum: age,
      regNos: [parseInt(student.regNo)],
    };
    assigned = true;
    break;
  }

  if (
    group.members.length < maxGroupSize &&
    Math.abs(group.oldest - age) <= maxAgeDifference
  ) {
    group.members.push({
      name: student.name,
      dob: student.dob,
      regNo: student.regNo,
      age,
    });
    group.members.sort((a, b) => a.age - b.age);
    group.oldest = group.members[group.members.length - 1].age;
    group.sum += age;
    group.regNos.push(parseInt(student.regNo));
    group.regNos.sort((a, b) => a - b); // Sort regNos in ascending order
    assigned = true;
    break;
  }
}

if (!assigned) {
  groupCounter++;
  groups[`group${groupCounter}`] = {
    members: [
      {
        name: student.name,
        dob: student.dob,
        regNo: student.regNo,
        age,
      },
    ],
    oldest: age,
    sum: age,
    regNos: [parseInt(student.regNo)],
  };
}
}

const noOfGroups = groupCounter;

const output = { noOfGroups };
for (const groupKey in groups) {
output[groupKey] = groups[groupKey];
}

return output;
}
export default classifier;
