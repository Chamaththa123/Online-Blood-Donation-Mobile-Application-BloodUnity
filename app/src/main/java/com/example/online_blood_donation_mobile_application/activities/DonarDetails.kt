package com.example.online_blood_donation_mobile_application.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import com.example.online_blood_donation_mobile_application.R

class DonarDetails : AppCompatActivity() {

    private lateinit var tvName: TextView
    private lateinit var tvGroup: TextView
    private lateinit var tvAddress: TextView
    private lateinit var tvNumber: TextView
    private lateinit var tvStatus: TextView
    private lateinit var UpdateDonar : Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_donar_details)

        initView()
        setValuesToViews()

        UpdateDonar.setOnClickListener {
            openUpdateDialog(
                intent.getStringExtra("donatorId").toString(),
                intent.getStringExtra("name").toString()
            )
        }
    }

    private fun initView() {
        tvName = findViewById(R.id.tvName)
        tvGroup = findViewById(R.id.tvGroup)
        tvAddress = findViewById(R.id.tvAddress)
        tvNumber = findViewById(R.id.tvNumber)
        tvStatus = findViewById(R.id.tvStatus)
    }


    private fun setValuesToViews() {

      tvName.text = intent.getStringExtra("name")
        tvGroup.text = intent.getStringExtra("group")
        tvAddress.text = intent.getStringExtra("address")
        tvNumber.text = intent.getStringExtra("number")
        tvStatus.text = intent.getStringExtra("status")

    }

    private fun  openUpdateDialog(
        donatorId: String,
        name: String
    ){
        
    }
}