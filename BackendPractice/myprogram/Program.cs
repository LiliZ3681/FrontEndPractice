using System.Collections.Generic;
// write and read
Console.Title = "Skynet";
Console.ForegroundColor = ConsoleColor.Green;

Console.WriteLine("Hello! What's ur name?");

string? name = Console.ReadLine(); // may be null

Console.WriteLine($"Hello, {name}!");

// array, loop and if 
List<string> studentList = new List<string>();

Console.Write("Please enter the number of students in the class: ");
int num = Convert.ToInt32(Console.ReadLine());

for (int i = 0; i < num; i++)
{
    Console.Write("Enter student's name: ");
    string? studentName = Console.ReadLine();
    if (!string.IsNullOrWhiteSpace(studentName))
    {
        studentList.Add(studentName);
    }
}
studentList.Sort();

foreach (string student in studentList)
{
    Console.WriteLine(student);
}

// method 
string exampleSentence = "This is an example";
Console.Write($"There are {countWordInSentence(exampleSentence)} words in sentence \"{exampleSentence}.\" ");

int countWordInSentence(string inputSentence)
{
    return inputSentence.Split(" ").Length;
}

Console.ReadKey();