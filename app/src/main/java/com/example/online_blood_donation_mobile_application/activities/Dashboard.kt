package com.example.online_blood_donation_mobile_application.activities

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.example.online_blood_donation_mobile_application.R

class Dashboard : AppCompatActivity() {
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)

        val dlist = findViewById<Button>(R.id.dlist)
        val alist = findViewById<Button>(R.id.AllAmbulance)
        val rlist = findViewById<Button>(R.id.request)

        dlist.setOnClickListener {
            val intent = Intent(this, Donarfeaching::class.java)
            startActivity(intent)
        }

        alist.setOnClickListener {
            val intent = Intent(this, AmbulanceDash::class.java)
            startActivity(intent)
        }

        rlist.setOnClickListener {
            val intent = Intent(this, Requestfeaching::class.java)
            startActivity(intent)
        }
    }
}