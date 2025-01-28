**Szymon Sobiepanek**
## Scenariusz zajęć komputerowych dla klas 1-3
# Wyszukiwanie Binarne
### Cele lekcji:
Uczeń:
* wie jakie operacje wykonywane przez komputer są czasochłonne
* wie, że komputer wykorzystuje algorytmy do wykonania czynności możliwie szybko
* zna intuicyjną definicje algorytmu oraz wydajności
* umie przeprowadzić algorytm wyszukiwania binarnego
### Metody
* pokaz
* pogadanka
* ćwiczenia w parach
### Formy pracy
* z całą klasą
* w parach
### Środki dydaktyczne:
* koperty z liczbami
* komputer z dostępem do Internetu
### Opis lekcji:
Lekcja, w sposób problemowy, wprowadza uczniów w zagadnienie algorytmów. Zamiast zwyczajowego wprowadzania pojęcia algorytmu, uczniowie odkrywają, jaki jest powód współczesnego ich stosowania.
W trakcie zajęć uczniowie próbują odkryć, jakie operacje są czasochłonne dla komputera podczas codziennego użytkowania. Celem zajęć jest spostrzeżenie  przez uczniów faktu, że komputer nawet do zdawałoby się prostych czynności, takich jak odnalezienie danych, musi wykonać wiele operacji. Korzystając z własnych doświadczeń uczniowie dojdą do wniosku, że  oczekiwanie jest irytujące dla użytkownika komputera, więc operacje muszą być wykonane możliwie szybko. Rozwiązaniem tych problemów są algorytmy. Jako przykład algorytmu, który umożliwia szybkie znalezienie wartości w zbiorze uporządkowanym przedstawiamy uczniom algorytm [wyszukiwania binarnego](https://pl.wikipedia.org/wiki/Wyszukiwanie_binarne). Oczywisty jest, że przed przeprowadzeniem lekcji należy ten algorytm dokładnie poznać.
### Przebieg zajęć:
Zajęcia rozpoczynają się rozmową z uczniami na temat sytuacji w których najczęściej czeka się aż komputer wykona operacje. Każdy z uczniów może wypowiedzieć się na ten temat. Zebrane przykłady są porównywane. Wymienione mogą być sytuacje wykonywania obliczenia, wyświetlania filmu czy też ładowania gry. Przypadek ładowania wymaga dalszego omówienia – możemy zapytać, co na komputerze ładuje się najdłużej i podsunąć wskazówkę, że wiąże się to z ilością danych, które potrzebne są do wykonania danej operacji. Podsumowaniem rozmowy jest pytanie do uczniów, czy lubią czekać podczas pracy z komputerem. Po otrzymaniu odpowiedzi, przechodzimy do przykładu w którym pokażemy, że dany problem można rozwiązać różnymi metodami, a niektóre z nich są szybsze lub wolniejsze.

Rozdajemy uczniom ponumerowane koperty, które zawierają liczby od 1 do 30 w kolejności rosnącej. Zadaniem uczniów jest znaleźć liczbę 10 otwierając jak najmniej kopert.  Po wykonaniu zadania przez uczniów, pytamy ich o liczbę otwartych kopert i metodę, którą wykorzystali do wyboru kopert, które kolejno otwierali. Porównujemy czynność otwierania kopert z operacjami, które wykonuje komputer, gdy uzyskuje dostęp do danych. Kluczowe jest tu zaprezentowane, że od liczby wykonywanych operacji zależy czas ich przeprowadzenia.

Następne zadanie wykonane prze uczniów wykonane jest na komputerze. Na stronie internetowej uczniowie po raz kolejny zmierzą się z problemem znalezienia danej w posortowanym zbiorze – znalezienia ucznia o nazwisku Jankowski. Po przeprowadzeniu kilku prób, pytamy uczniów w ilu krokach najczęściej znajdowali wskazane nazwisko. Wspólnie z uczniami ustalamy, czy znalezienie ucznia w jednym czy dwóch krokach było szczęśliwym trafem czy też wynikało z dobrze dobranej metody.

Kolejnym krokiem jest sprawdzenie w ilu krokach Jankowskiego znajdzie komputer – służy do tego dalsza część strony internetowej. Po przeprowadzeniu każdego eksperymentu pytamy uczniów o liczbę kroków, w których komputerowi udało się, zlokalizować ucznia.

Po przeprowadzeniu 2-3 wyszukiwania przez każdą z par. Wspólnie z uczniami ustalamy w jakie liczbie kroków komputer wyszukał ucznia – najczęściej było to 4 lub 5 kroków, ale co ważne wartość 5 nie została nigdy przekroczona. Pytamy uczniów o przyczynę oraz obserwacje o tym, które wartości  i w jakiej kolejności sprawdzał komputer. Kontynuujemy rozmowę, udzielając wskazówek tak, uczniowie powiązali dobre wyniki osiągane przez komputer (małą liczbę wykonanych kroków) z metodą wyszukiwani, którą zastosował komputer. Metodę tą nazywamy algorytmem.

Następnie wraz z uczniami próbujemy prześledzić algorytm na tablicy. Możemy przy tym skorzystać z następującej listy uczniów.

1.Baran
2.Baran
3.Dąbrowski
4.Ejsmont
5.Ejsmont
6.Ejsmont
7.Ejsmont
8.Ejsmont
9.Ejsmont
10.Ejsmont
11.Filipiak
12.Filipiak
13.Grabowski
14.Grabowski
15.Iwański
16.Iwański
17.Iwański
18.Iwański
19.Jankowski
20.Pawłowski

Aby prześledzić algorytm rozpisujemy 20 pozycji na tablicy.

1.
2.
3.
4.
5.
6.
7.
8.
9.
10.
11.
12.
13.
14.
15.
16.
17.
18.
19.
20.

Pytamy uczniów, która z pozycji jest wybierana jako pierwsza przez komputer. Uczniowie nie powinni mieć problemów ze wskazaniem dziesiątej pozycji. Zapisujemy odpowiednie nazwisko na tablicy:

1.
2.
3.
4.
5.
6.
7.
8.
9.
10.Ejsmont
11.
12.
13.
14.
15.
16.
17.
18.
19.
20.

Przypominamy, że uczniowie zapisanie są w kolejności alfabetycznej.

Rozpoczynamy rozmowę, w której pytamy uczniów o wnioski z faktu, że na 10 pozycji jest uczeń o nazwisku na E – gdzie będzie Jankowski? Uczniowie nie powinni mieć problemu ze skazaniem, że Jankowski będzie mia numer między 11 a 20. Wspólnie z uczniami formułujemy wniosek, że teraz zamiast wyszukiwać w tabeli o 20 elementach wyszukiwać będziemy w tabeli o 10 elementach, co o połowę zawęża nam obszar poszukiwań. Pytamy uczniów, co by się stało, gdyby na 10 pozycji pojawił się uczeń o nazwisku rozpoczynającym się na dalszą literę w alfabecie niż litera J. Uczniowie nie będę mieli problemu tą sytuacją, wówczas szukalibyśmy Jankowskiego na pozycjach 1 – 9 w tabeli 9 elementowej. Wspólnie z uczniami dochodzimy do wniosku, że wybranie 10 jako pierwszej pozycji którą chcemy sprawdzić, pozwala nam podzielić problem na „o połowę mniejszy” co sprawia, że wskazanie połowy przedziału zdaję się być najlepszym rozwiązaniem. Jest to kluczowy moment w analizie algorytmu – wszyscy uczniowie powinni mieć być przekonani do słuszności wniosku. Oczywiście, nie chcemy przedstawiać im formalnego dowodu na poprawność konstruowanego algorytmu, chodzi nam o odwołanie się do intuicji uczniów.

Jeżeli wszystkie wątpliwości uczniów zostały w poprzednim etapie rozwiane, sprawnie
wskażą kolejne pozycje, które należy sprawdzić:

Kolejna będzie pozycja 15:

1.
2.
3.
4.
5.
6.
7.
8.
9.
10.Ejsmont
11.
12.
13.
14.
15.Iwański
16.
17.
18.
19.
20.

Potem 18:

1.
2.
3.
4.
5.
6.
7.
8.
9.
10.Ejsmont
11.
12.
13.
14.
15.Iwański
16.
17.
18.Iwański
19.
20.

A następnie 19:

1.
2.
3.
4.
5.
6.
7.
8.
9.
10.Ejsmont
11.
12.
13.
14.
15.Iwański
16.
17.
18.Iwański
19.Jankowski
20.

W tym momencie warty podkreślenie jest fakt, że chociaż nam łatwo wskazać jest element dzielący pozostały blok na połowy, komputer musi ten numer dokładnie policzyć. Jeżeli uczniowie są zainteresowani tą kwestią oraz dosyć biegli w rachunkach możemy pokusić się na wspólną próbę odkrycia metody wyznaczania kolejnej sprawdzanej pozycji. Dla większości uczniów ta kwestia nie będzie jednak porywająca i nie ma istotnej potrzeby, aby skupiać się na niej na tym poziomie edukacji.

Jeżeli mamy pewność, że uczniowie rozumieją przebieg algorytmu, zlecamy im powtórzenie  pierwszego ćwiczenia ze strony internetowej.

