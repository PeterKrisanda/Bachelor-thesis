proc pod {x} {
set u 1
set body 0

    for {set i 1} {$i < 4} {incr i} { 
        if { [regexp "(!!!)" [exec "ping 200.$x.$i.5  timeout 1 repeat 3" ]] } {
            puts "Uloha c. $u: 200.$x.$i.5 ok"
            incr u
            if { $i == 1 } {
              set body [expr {$body+30}]
            }
            if { $i == 2 } {
              set body [expr {$body+25}]
            }
            if { $i == 3 } {
              set body [expr {$body+25}]
            }
            
        } else { 
            puts "Uloha c. $u: 200.$x.$i.5 failed"
            incr u
        }
    }
    if { $x <= 9 } {
    set a [expr {$x+20}]
    }
    if { $x >= 10 } {
    set a [expr {$x+200}]
    }
    
    if { [regexp "(!!!)" [exec "ping 10.0.0.$a  timeout 1 repeat 3" ]] } {
            puts "Uloha c. $u: 10.0.0.$a ok"  
            set body [expr {$body+20}]      
        } else { 
            puts "Uloha c. $u: 10.0.0.$a failed"
        }
        
     puts "Pocet bodov: $body/100"
}
