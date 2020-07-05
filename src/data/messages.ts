import { Image } from "./../message/image";
import { MultipleChoice } from "../message/multiplechoice";
import { InputChoice } from "../message/inputchoice";
import { Popup } from "../message/popup";

type Message = Image | InputChoice | MultipleChoice | Notification | Popup;

const messageByID: {[id: string]: Omit<Message, "id"> } = {
  start: {
    type: "popup",
    text: "_Datenschutz_  |  _Impressum_",
    popupText: "*Impressum:*\n\n Herausgeber:\nJonas Wilms\nAsselermoor 17\n21706 Drochtersen\njonaswilms2000@gmail.com\n\nDiese Seite speichert nichts ... außer, das du da warst (deine IP landet bestimmt in einigen serverlogs).", 
    time: 0,
    next: "headline",
  },

  headline: {
    text: "Eine virtuelle Welt der\n*Virtualisierung*\n_von Jonas Wilms_",
    headline: true,
    time: 1000,
    next: "begin",
  },

  begin: {
    text: "Hier bekommst du einen kleinen Überblick über verschiedene Arten der Virtualisierung, zwischendrin gibt es ein paar Quizfragen zum wiederholen.",
    next: "network1",
  },

  network1: {
    text: "Wir beginnen mit der Netzwerkvirtualisierung. Hierbei bildet das Netzwerk nicht die physikalische Welt (also Kabel und Geräte) ab, sondern durch die Konfiguration von Switchen, Routern und Servern werden virtuelle Netzwerke, mit virtuellen Hosts erschaffen. Schau dir hierzu @VLANs|https://de.wikipedia.org/wiki/Virtual_Local_Area_Network@ und virtuelle IP-Adressen, insbesondere @floating IPs|https://www.ionos.de/digitalguide/server/knowhow/floating-ip-was-ist-das-eigentlich/@ an. Wenn dich das Thema interessiert, kannst du dir auch @VRRP|https://de.wikipedia.org/wiki/Virtual_Router_Redundancy_Protocol@ anschauen.",
    next: "q1",
  },

  q1: {
    text: "Durch VLANs können Anwendungen virtualisiert werden.",
    answers: [
      { text: "Wahr", right: false, next: "q1_r" },
      { text: "Falsch", right: true, next: "q1_w" }
    ],
  },

  q1_w: {
    text: "Genau, _Virtual Local Area Networks_ sind eine Technik zur Netzwerkvirtualisierung",
    next: "q2"
  },

  q1_r: {
    text: "Falsch, _Virtual Local Area Networks_ sind eine Möglichkeit, um Netzwerke zu virtualisieren, nicht Anwendungen",
    next: "q2"
  },

  q2: {
    type: "multiple",
    text: "Vorteile von Netzwerkvirtualisierung sind ...",
    answers: [
      { text: "Einfaches Austauschen von Diensten", right: true },
      { text: "Ermöglicht Redundanzen", right: true },
      { text: "Ist sehr einfach einzurichten", right: false }
    ],
    next: "q2_a"
  },

  q2_a: {
    text: "Netzerkvirtualisierung ermöglicht vieles, aber einfach zu konfigurieren ist sie nicht: Es müssen eine Vielzahl von Diensten und Protokollen ineinandergreifen, damit alles reibungslos funktioniert.",
    next: "q3"
  },

  q3: {
    text: "Virtuelle IP-Adressen können verschiedenen Hosts zugeordnet werden.",
    answers: [
      { text: "Wahr", right: true, next: "q3_a" },
      { text: "Falsch", right: false, next: "q3_a" }
    ]
  },

  q3_a: {
    text: "Auf virtuelle IP-Adressen können verschiedene Hosts antworten. Wer antwortet wird nach bestimmten Kriterien festgelegt. Dadurch können die eingehenden Anfragen von verschiedenen Hosts beantwortet werden (_load balancing_), oder ein Host beginnt zu antworten, wenn er bemerkt, das ein anderer Host nicht mehr erreichbar ist (_failover_).",
    next: "vm1"
  },

  vm1: {
    text: "Die nächste Art der Virtualisierung, mit der wir uns beschäftigen, ist die Virtualisierung von Maschinen. Hierbei betrachten wir den Computer aus der Sicht eines Programms. Das Programm kann verschiedene Anfragen an den Kernel stellen, z.B. _Öffne die Datei /etc/hosts_ oder _Welche anderen Programme laufen gerade?_ (siehe @Syscall|https://de.wikipedia.org/wiki/Systemaufruf@). Der Kernel kann dann auf diese Anfragen, je nach dem welches Programm anfragt, unterschiedlich antworten. Aus der Sicht der Programme sieht es dadurch so aus, als würden sie auf verschiedenen Computern laufen. Dateien unter dem selben Pfad können dadurch z.B. für zwei Programme auf verschiedene 'reale' Dateien des Hosts zeigen, und verschiedene Pfade auf die selbe Datei. Dadurch können Programme voneinander isoliert werden. Da hier das Betriebssystem die Virtualisierung übernimmt, spricht man hier von _Betriebssystemvirtualisierung_. Wenn man verschiedene Programme auf gemeinsame Ressourcen zugreifen lässt, spricht man von einem @Container|https://de.wikipedia.org/wiki/Containervirtualisierung@.",
    next: "vm2",
    time: 2000,
  },

  vm2: {
    text: "Wenn man nicht nur einzelne Programme virtualisieren will, sondern das gesamte Betriebssystem, nutzt man 'Virtuelle Maschinen' (oder auch _Plattformvirtualisierung_). Hierzu kann man entweder einen Computer @emulieren|https://de.wikipedia.org/wiki/Emulator_@, was allerdings extrem langsam ist, oder man nutzt spezielle Funktionen des Prozessors, um mehrere Betriebsysteme isoliert voneinander auszuführen. Eins der Betriebssysteme agiert dann als @Hypervisor|https://de.wikipedia.org/wiki/Hypervisor@, und verwaltet die anderen Betriebsysteme.",
    next: "vm_video"
  },

  vm_video: {
    code: '<iframe width="560" height="315" src="https://www.youtube.com/embed/uAh25oZhu8A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    next: "vm3"
  },

  vm3: {
    text: "Dieses Video solltest du dir auf jeden Fall anschauen.",
    answers: [
      { text: "Alles klar, das reicht mir an Wissen", next: "q4", },
      { text: "Ich habe 4 Wochen Zeit, Lust x86 assembly zu lernen, und zu verstehen wie VMs wirklich funktionieren.", next: "vm3_extended"}
    ]
  },


  vm3_extended: {
    text: "Wenn du wirklich verstehen willst, wie ein Hypervisor funktioniert, solltest du dich zuerst mit @CPU-Ringen|https://de.wikipedia.org/wiki/Ring_(CPU)@, der @MMU|https://de.wikipedia.org/wiki/Memory_Management_Unit@ und @page tables|https://en.wikipedia.org/wiki/Page_table@ beschäftigen, @x86 assembly|https://www.cs.virginia.edu/~evans/cs216/guides/x86.html@ müsstest du dann auch lernen. Besonders wichtig ist hier die _mov c3, ..._ Instruktion (einige Beispiele @hier|https://wiki.osdev.org/Paging@). Mit diesen 'Grundlagen' kannst du dann mit @diesem Tutorial|https://rayanfam.com/topics/hypervisor-from-scratch-part-1/@ deinen eigenen Hypervisor schreiben. Aber erstmal ein paar Quizfragen!",
    next: "q4"
  },

  q4: {
    type: "multiple",
    text: "Bekannte Plattform-Virtualisierungen sind (falls nicht bekannt googlen) ...",
    answers: [
      { text: "VirtualBox", right: true },
      { text: "Docker", right: false },
      { text: "Hyper-V", right: true },
      { text: "VMWare vSphere", right: true}
    ],
    next: "q4_a"
  },

  q4_a: {
    text: "Hyper-V ist eine Komponente von Windows, mit der Windows als Hypervisor genutzt werden kann, VMWare vSphere ist ein Betriebssystem, das als Hypervisor ausgelegt ist, und VirtualBox ist ein Anwenderprogramm, das als Hypervisor agiert. Docker hingegen ist eine Betriebssystemvirtualisierung.",
    next: "q5"
  },

  q5: {
    text: "Containerisierung und Betriebssystemvirtualisierung sind Synonyme.",
    answers: [
      { text: "Wahr", right: true, next: "q5_r" },
      { text: "Falsch", right: false, next: "q5_w" },
    ]
  },

  q5_r: {
    text: "Genau, das Betriebssystem isoliert einige Prozesse voneinander, diese bilden dann 'Container'.",
    next: "q6"
  },

  q5_w: {
    text: "Die beiden Begriffe sind so eng verwandt, dass man sie guten Gewissens durcheinander schmeißen kann.",
    next: "q6"
  },

  q6: {
    text: "Bei der Plattformvirtualisierung hat jedes Betriebssystem seinen eigenen Kernel.",
    answers: [
      { text: "Wahr", right: true, next: "q6_a" },
      { text: "Falsch", right: false, next: "q6_a" },
    ]
  },

  q6_a: {
    text: "Bei der Plattformvirtualisierung sind die verschiedenen virtuellen Maschinen, im Gegensatz zu Containern, komplett unabhängig, haben also auch ihren eigenen Betriebssystemkernel.",
    next: "storage1"
  },

  storage1: {
    text: "Schauen wir uns nun 'Speichervirtualisierung' an. Auch hier bietet @Wikipedia|https://de.wikipedia.org/wiki/Speichervirtualisierung@ einen guten Überblick, auch von @Storage Area Networks|https://de.wikipedia.org/wiki/Storage_Area_Network@ sollte man mal gehört haben.",
    next: "q7"
  },

  q7: {
    type: "multiple",
    text: "Durch die Speichervirtualisierung werden Daten verschiedener physikalischer Medien von verschiedenen Geräten über das Netzwerk bereitgestellt. Welche Vorteile bietet das?",
    answers: [
      { text: "Synchronisierung über verschiedene Rechenzentren hinweg möglich, Georedundanz", right: true },
      { text: "erhöhte Performance", right: false },
      { text: "schnelle Migration von Diensten", right: true },
    ],
    next: "q7_a"
  },

  q7_a: {
    text: "Durch Speichervirtualisierung kann der Speicher zwischen beliebigen geräten synchronisiert werden, also auch zwischen verschiedenen Rechenzentren, sodass im Falle eines Ausfalles ein anderes Rechenzentrum die Bereitstellung der Dienste übernehmen kann (Georedundanz). Dadurch können Dienste auch schnell umgezogen werden, ohne manuell Daten zu kopieren. Da die Daten allerdings über das Netzwerk synchronisiert werden müssen, sind Netzwerkspeicher langsamer als physikalischer Speicher vor Ort.",
    next: "application1"
  },

  application1: {
    text: "Zum Thema _Anwendungsvirtualisierung_ solltest du eigentlich schon Experte sein. Wenn du auf google.com was googlest, auf gmx.de deine Mails liest oder auf netflix.com eine Serie bingewatchst, nutzt du schon 'virtuelle Anwendungen', die also nicht auf deinem Gerät installiert sind, sondern auf einem Server bereitgestellt werden.",
    next: "summary",
  },

  summary: {
    text: "Du solltest nun Plattformvirtualisierung, Betriebssystemvirtualisierung, Netzwerkvirtualisierung und Speichervirtualisierung grob kennen. Du kannst nun also guten Gewissens diese virtuelle Welt verlassen und einen realen Kaffee trinken (oder ein anderes Getränk deiner Wahl).",
    next: "end",
  },

  end: {
    text: "_Viel Glück bei deiner Klausur :)\nBei Fragen kannst du gerne an jonas [at] wilms.ninja schreiben!_",
    next: "end_image"
  },

  end_image: {
    type: "image",
    src: "https://media-exp1.licdn.com/dms/image/C5112AQFPxSwR9Syexw/article-inline_image-shrink_1000_1488/0?e=1599696000&v=beta&t=eFE9NRvz-dvifFDvcwhO87t-BUUDxn_oCS7ZDUrX_00",
    alt: "There is no cloud",
    next: ""
  }
 



};

export default messageByID;
